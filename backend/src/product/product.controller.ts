import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from "./product.service";
import { json } from 'express';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService){}


    @Get('/')
    async getProducts(@Res() res){
        const products = await this.productService.getProducts();
        return res
        .status(HttpStatus.OK)
        // .json({
        //     message: `(${products.length}) product(s) found.`,
        //     data: products
        // });
        .json(products);

    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID){
        const product = await this.productService.getProduct(productID);

        // if(!product)
        // throw new NotFoundException('Product Does not exist!');

        return res
        .status(HttpStatus.OK)
        // .json({
        //     message: `Product Found!.`,
        //     data: product
        // });
        .json(product);
    }

    @Post('/')
    async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO){
        const product = await this.productService.createProduct(createProductDTO);
        return res
        .status(HttpStatus.OK)
        .json({
            message: 'Product Successfully Created',
            data: product
        });
        
    }

    @Put('/:productID')
    async updateProduct(@Res() res, @Param('productID') productID, @Body() updateProductDTO: CreateProductDTO){

        const updated = await this.productService.updateProduct(productID, updateProductDTO);

        if(!updated)
        throw new NotFoundException('Product Does not exist!');

        return res
        .status(HttpStatus.OK)
        // .json({
        //     message: 'Product Successfully Updated',
        //     data: product
        // });
        .json(
            updated
        )
    }

    @Delete('/:productID')
    async deleteProduct(@Res() res, @Param('productID') productID){
        const info = await this.productService.deleteProduct(productID);

        if(!info)
        throw new NotFoundException('Product Does not exist!');

        return res
        .status(HttpStatus.OK)
        // .json({
        //     message: `Product Successfully Deleted!.`,
        //     data: product
        // });
        .json(
            info
        );
    }


}
