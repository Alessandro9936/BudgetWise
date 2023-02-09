import z from "zod";

const DeleteUserSchema = z.object({
  password: z.string().min(1, "To delete profile, password is required"),
});

export default DeleteUserSchema;
