import { useState } from "react"
import { loginSchema } from "../schemas/loginSchema";
import { yupToFormError } from "../utils/yupToFormErrors"




export default function LoginForm() {
  const styles = {
    divInput: 'flex gap-2',
    input: "border-1 rounded-lg",
    textError: "text-red-500 font-medium text-x"
  }

  const [form, setForm] = useState({
    email: "",
    password: "",
     age: "",
    day: ""
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e)
    try {
      await loginSchema.validate(form, { abortEarly: false })
      alert("ส่งสำเร็จ")
      setErrors({})

    } catch (err) {
      console.log(err)
      // const errorObj = {}
      // err.inner.forEach((error) => {
      //   errorObj[error.path] = error.message;
      // })

      const errorObj = yupToFormError(err);
      setErrors(errorObj);
    }
  }




  return (
    <>
      <p className='text-2xl font-bold mb-10'>CC20</p>
      <form className='space-y-2' onSubmit={handleSubmit}>
        <div className={styles.divInput}>
          <label>Email :</label>
          <p>
            <input
              className={styles.input}
              type="email"
              name='email'
              value={form.email}
              onChange={handleChange}
            />
          </p>
          <p className={styles.textError}>{errors.email}</p>
        </div>
        <div className={styles.divInput}>
          <p>
            <label>รหัสผ่าน</label>
            <input
              className={styles.input}
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </p><br />
          <p className={styles.textError}>{errors.password}</p>
        </div>
        <div className={styles.divInput}>
          <label>Day:</label>
          <input
            className={styles.input}
            type="number"
            name="day"
            value={form.day}
            onChange={handleChange}
          />
          <p className={styles.textError}>{errors.day}</p>
        </div>
        <div className={styles.divInput}>
          <label>Age:</label>
          <input
            className={styles.input}
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
          />
          <p className={styles.textError}>{errors.age}</p>
        </div>
        <div>
          <button type='submit'>Subscribe</button>
        </div>
      </form>
    </>
  )
}