import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min
} from "class-validator";
import { PropertyType } from "../listing.types";

const propertyTypes: PropertyType[] = ["apartment", "house", "townhouse", "villa", "studio"];

export class CreateListingDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price!: number;

  @IsString()
  city!: string;

  @IsString()
  address!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  bedrooms!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  bathrooms!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  area!: number;

  @IsIn(propertyTypes)
  type!: PropertyType;

  @Type(() => Number)
  @IsNumber()
  latitude!: number;

  @Type(() => Number)
  @IsNumber()
  longitude!: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsUrl({}, { each: true })
  images!: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @IsOptional()
  @IsISO8601()
  createdAt?: string;
}

