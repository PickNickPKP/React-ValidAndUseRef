import * as Yup from 'yup'

export const loginSchema = Yup.object({
  email: Yup.string().email("รูปแบบอีเมล์ไม่ถูกต้อง").required("กรุณาอีเมล"),
  // password: Yup.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัว").required("กรุณารหัสผ่าน")
  password: Yup.string()
  .min(6 ,({path , value}) => `${path} รหัสผ่านต้องมีอย่างน้อย 6 ตัว ตอนนี้มี ${value.length} `)
  .required("กรุณากรอกรหัสผ่าน"),
  day: Yup.number()
  .typeError("ต้องเป็นตัวเลข")
  .min(1,"วันต้องอยู่ระหว่าง 1 ถึง 31")
  .max(31,"วันต้องอยู่ระหว่าง 1 ถึง 31")
  .typeError("กรุณากรอกอายุ"),
  age : Yup.number()
  .min(11 ,({path ,value})=> `${path} ต้องมีอายุมากกว่า 10 ปี ตอนนี้คือ ${value}`)
  .max(31,"วันต้องอยู่ระหว่าง 1 ถึง 31")
  .typeError("กรุณากรอกอายุ")
}
  )
