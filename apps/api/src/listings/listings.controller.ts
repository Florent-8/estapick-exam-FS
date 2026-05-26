import { Controller, Get, Param, Query } from "@nestjs/common";
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
}

