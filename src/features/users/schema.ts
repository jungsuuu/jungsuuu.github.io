import { z } from "zod";

// 비밀번호 규칙: 최소 8자, 대문자 1개, 숫자 1개, 특수문자 1개
const passwordSchema = z
  .string()
  .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
  .regex(/[A-Z]/, "비밀번호는 최소 1개 이상의 대문자를 포함해야 합니다.")
  .regex(/[0-9]/, "비밀번호는 최소 1개 이상의 숫자를 포함해야 합니다.")
  .regex(
    /[!@#$%^&*]/,
    "비밀번호는 최소 1개 이상의 특수문자(!@#$%^&*)를 포함해야 합니다.",
  );

const emailSchema = z.string().email("유효한 이메일 주소가 아닙니다.");

// 사용자 생성 스키마 (비밀번호 필수)
export const createUserSchema = z
  .object({
    name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다."),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    roleId: z.string().min(1, "역할을 선택하세요."),
    isActive: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type CreateUserFormData = z.infer<typeof createUserSchema>;

// 사용자 수정 스키마 (비밀번호 선택)
export const updateUserSchema = z
  .object({
    name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다."),
    email: emailSchema,
    password: passwordSchema.optional().or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
    roleId: z.string().min(1, "역할을 선택하세요."),
    isActive: z.boolean(),
  })
  .refine(
    (data) => {
      // 비밀번호가 입력된 경우에만 일치 확인
      if (data.password && data.password.trim()) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["confirmPassword"],
    },
  );

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
