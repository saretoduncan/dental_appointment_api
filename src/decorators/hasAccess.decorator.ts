import { SetMetadata } from "@nestjs/common";
import { AccessLevelResDto } from "src/dto/users.dto";

export const HasAccess=(...accessLevels:string[])=>SetMetadata('accessLevels', accessLevels);