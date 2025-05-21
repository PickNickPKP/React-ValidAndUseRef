import * as Yup from "yup";

export const signupSchema = Yup.object({
  username: Yup.string()
    .required("กรุณากรอกชื่อ")
    // .min(3, "ชื่อผู้ใช้ อย่างน้อย 3 ตัวอักษร")
    .matches(/^[a-zA-Z0-9]{5,12}$/,"ชื่อผู้ใช้ อย่างน้อย 5-12 ตัวอักษร"),

  nickname: Yup.string()
    .required("กรุณากรอกชื่อเล่น")
    .min(3, ({ value, min }) => `"ชื่อผู้ใช้ อย่างน้อย ${min} ตัวอักษร ตอนนี้กรอกอยู่ ${value.length} ตัว`)
    .max(10, ({ value, max }) => `"ชื่อผู้ใช้ อย่างไม่เกิน ${max} ตัวอักษร ตอนนี้กรอกอยู่ ${value.length} ตัว`),

  password: Yup.string()
    .required("กรุณากรอกรหัสผ่าน")
    .min(6, "รหัสผ่านต้องอย่างน้อย6 ตัว"),

  confirmPassword: Yup.string()
    .required("กรุณายืนยัน")
    .oneOf([Yup.ref("password")], "รหัสผ่านไม่ตรงกัน"),

  age: Yup.number()
    .typeError("กรุณากรอกอายุเป็นตัวเลข")
    .min(14, "ต้องมีอายุมากกว่า 13 ปี"),

  terms: Yup.boolean()
    .oneOf([true], "ต้องยอมรับเงื่อนไขก่อน")
})