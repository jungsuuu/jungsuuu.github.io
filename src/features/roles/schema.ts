import { z } from "zod";

export const roleSchema = z.object({
  name: z.string().min(2, "역할명은 최소 2자 이상이어야 합니다."),
  description: z.string().optional(),
  permissions: z.array(z.string()).min(1, "최소 1개 이상의 권한을 선택하세요."),
});

export type RoleFormData = z.infer<typeof roleSchema>;
