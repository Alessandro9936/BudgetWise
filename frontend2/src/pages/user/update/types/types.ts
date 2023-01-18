import { z } from "zod";
import {
  UserUpdateSchemaNoPasswords,
  UserUpdateSchemaPasswords,
} from "../utils/validation-schema";

export type IUpdateUserFormNoPassword = z.infer<
  typeof UserUpdateSchemaNoPasswords
>;
export type IUpdateUserFormPassword = z.infer<typeof UserUpdateSchemaPasswords>;
