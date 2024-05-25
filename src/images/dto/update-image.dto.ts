import { ApiProperty } from "@nestjs/swagger";

export class UpdateImageDto {
    @ApiProperty()
    name: string;
}