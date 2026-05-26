import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ListingsModule } from "./listings/listings.module";

@Module({
  imports: [ListingsModule],
  controllers: [AppController]
})
export class AppModule {}
