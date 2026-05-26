import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  root() {
    return {
      name: "Estapick Property Listings API",
      status: "ok",
      endpoints: {
        health: "/health",
        listings: "/listings",
        listingDetail: "/listings/:id",
        createListing: "POST /listings"
      }
    };
  }

  @Get("health")
  health() {
    return { status: "ok" };
  }
}
