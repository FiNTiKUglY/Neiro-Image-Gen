import { ApiProperty } from "@nestjs/swagger";

export class AddImageDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    status: string;
}