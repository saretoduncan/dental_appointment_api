export type JwtPayloadDto = {
  sub: string;
  username: string;
  roles: string[];
};
export type RolesDto = {
  id: string;
  access_level: string;
};
