/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from "@jest/globals"
import {service} from "../../src/services/productsServices"
import {repository} from "../../src/repositories/productsRepository"
import { notFound } from "../../src/utils/errors"
import { generateProduct } from "../factory/unitFactory"

describe("connection to db", () => {
    it("should return string 'error'", async () => {
        jest.spyOn(repository, "connectToDb").mockImplementationOnce(async () => {return false})
        const ans = await service.verifyConnectionDb()
        expect(ans).toBe("error")
    })
  
    it("should return string 'ok'", async () => {
        jest.spyOn(repository, "connectToDb").mockImplementationOnce(async () => {return true})
        const ans = await service.verifyConnectionDb()
        expect(ans).toBe("ok")
    })
})

describe("last atualization database", () => {
    it("should return an string", async () => {
        jest.spyOn(repository, "getLastTimeUpdateDb").mockImplementationOnce((): any => {return generateProduct})
        const ans = await service.lastUpdate()
        expect(typeof ans).toBe("string")
    })
    
    it("should call not found error", async () => {
        jest.spyOn(repository, "getLastTimeUpdateDb").mockImplementationOnce((): any => {return null})
        const ans = await service.lastUpdate()
        expect(ans).rejects.toEqual(notFound("no data registered on database"))
    })
})

describe("performance node", () => {
    it("not should call not found error", async () => {
        const ans = await service.performanceNode()
        expect(ans).toHaveProperty("timeOriginMs")
        expect(ans).toHaveProperty("memoryInfo")
    })
})

describe("atualization product", () => {
    it("expect not thow error", async () => {
        jest.spyOn(repository, "updateProduct").mockImplementationOnce((): any => {return {modifiedCount: 1}})
        const ans = await service.callUpdateProductDb("4815162342", generateProduct)
        expect(typeof ans).toBe("undefined")
    })
    it("should thow not found error", async () => {
        jest.spyOn(repository, "updateProduct").mockImplementationOnce((): any => {return {modifiedCount: 0}})
        const ans = await service.callUpdateProductDb("4815162342", generateProduct)
        expect(ans).rejects.toEqual(notFound("product not found"))
    })
})


describe("to trash product", () => {
    it("should no has return", async () => {
        jest.spyOn(repository, "updateStatusToTrash").mockImplementationOnce((): any => {return {modifiedCount: 1}})
        const ans = await service.callUpdateDbStatus("4815162342")
        expect(typeof ans).toBe("undefined")
    })
    it("should throw product not found", async () => {
        jest.spyOn(repository, "updateStatusToTrash").mockImplementationOnce((): any => {return {modifiedCount: 0}})
        const ans = await service.callUpdateDbStatus("4815162342")
        expect(ans).rejects.toEqual(notFound("product not found"))
    })
})

describe("to trash product", () => {
    it("should no has return", async () => {
        jest.spyOn(repository, "updateStatusToTrash").mockImplementationOnce((): any => {return {modifiedCount: 1}})
        const ans = await service.callUpdateDbStatus("4815162342")
        expect(typeof ans).toBe("undefined")
    })
    it("should throw product not found", async () => {
        jest.spyOn(repository, "updateStatusToTrash").mockImplementationOnce((): any => {return {modifiedCount: 0}})
        const ans = await service.callUpdateDbStatus("4815162342")
        expect(ans).rejects.toEqual(notFound("product not found"))
    })
})

describe("list product by code", () => {
    it("should return product", async () => {
        jest.spyOn(repository, "getProductByCode").mockImplementationOnce((): any => {return generateProduct})
        const ans = await service.callGetProduct("4815162342")
        expect(ans).toHaveProperty("code"), 
        expect(ans).toHaveProperty("status")
        expect(ans).toHaveProperty("imported_t")
        expect(ans).toHaveProperty("url")
        expect(ans).toHaveProperty("creator")
        expect(ans).toHaveProperty("created_t")
        expect(ans).toHaveProperty("last_modified_t")
        expect(ans).toHaveProperty("product_name")
        expect(ans).toHaveProperty("quantity")
        expect(ans).toHaveProperty("brands")
        expect(ans).toHaveProperty("categories")
        expect(ans).toHaveProperty("labels")
        expect(ans).toHaveProperty("cities")
        expect(ans).toHaveProperty("purchase_places")
        expect(ans).toHaveProperty("stores")
        expect(ans).toHaveProperty("ingredients_text")
        expect(ans).toHaveProperty("traces")
        expect(ans).toHaveProperty("serving_size")
        expect(ans).toHaveProperty("serving_quantity")
        expect(ans).toHaveProperty("purchase_places")
        expect(ans).toHaveProperty("nutriscore_score")
        expect(ans).toHaveProperty("nutriscore_grade")
        expect(ans).toHaveProperty("main_category")
        expect(ans).toHaveProperty("image_url")
    })
    it("should throw product not found", async () => {
        jest.spyOn(repository, "getProductByCode").mockImplementationOnce((): any => {return null})
        const ans = await service.callUpdateDbStatus("4815162342")
        expect(ans).rejects.toEqual(notFound("product not found"))
    })
})

describe("to trash product", () => {
    it("should no has return", async () => {
        jest.spyOn(repository, "getAllProducts").mockImplementationOnce((): any => {return generateProduct})
        const ans = await service.callGetAllProducts(3)
        expect(typeof ans).toBe("object")
    })
    it("should throw product not found", async () => {
        jest.spyOn(repository, "getAllProducts").mockImplementationOnce((): any => {return []})
        const ans = await service.callGetAllProducts(3)
        expect(ans).rejects.toEqual(notFound("Not found products, wait for update"))
    })
})
