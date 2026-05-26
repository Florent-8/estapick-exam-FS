import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateListingDto } from "./dto/create-listing.dto";
import { ListingsQueryDto } from "./dto/listings-query.dto";
import { ListingsService } from "./listings.service";

@Controller("listings")
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Get()
  findAll(@Query() query: ListingsQueryDto) {
    return this.listingsService.findAll(query);
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.listingsService.findById(id);
  }

  @Post()
  create(@Body() payload: CreateListingDto) {
    return this.listingsService.create(payload);
  }
}
