import { useState ,useRef } from "react"
import { signupSchema} from "../schemas/signupSchema";
import { yupToFormError } from "../utils/yupToFormErrors"




export default function SignupForm() {
  const styles = {
    divInput: 'flex gap-2',
    input: "border-1 rounded-lg",
    textError: "text-red-500 font-medium text-xs"
  }

  const [form, setForm] = useState({
    username : "",
    nickname : "",
    password: "",
    confirmPassword : "",
    age: "",
    terms : false
  })

  const refs = {
    username : useRef(null),
    nickname : useRef(null),
    password : useRef(null),
    confirmPassword : useRef(null),
    age : useRef(null),
    terms : useRef(null)
  }

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    // setForm({ ...form, [e.target.name]: e.target.value })
    const {name, type , value, checked} = e.target;
    setForm( (prev)=>({
      ...prev ,
      [name]: type === "checkbox" ? checked : value
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e)
    try {
      await signupSchema.validate(form, { abortEarly: false })
      alert("ส่งสำเร็จ")
      setErrors({})

    } catch (err) {
      console.log(err)
      // const errorObj = {}
      // err.inner.forEach((error) => {
      //   errorObj[error.path] = error.message;
      // })

      const errorObj = yupToFormError(err,refs);
      setErrors(errorObj);
    }
  }




  return (
    <>
      <p className='text-xl font-bold mb-10'>CC20 Sigup Form</p>
      <form className='space-y-2' onSubmit={handleSubmit}>
        <div className={styles.divInput}>
          <label>Username :</label>
          <p>
            <input
              className={styles.input}
              type="text"
              name='username'
              value={form.username}
              onChange={handleChange}
              ref = {refs.username}
            />
          </p>
          <p className={styles.textError}>{errors.username}</p>
        </div>
        <div className={styles.divInput}>
          <p>
            <label>Nickname :</label>
            <input
              className={styles.input}
              name="nickname"
              type="text"
              value={form.nickname}
              onChange={handleChange}
              ref = {refs.nickname}
            />
          </p><br />
          <p className={styles.textError}>{errors.nickname}</p>
        </div>
        <div className={styles.divInput}>
          <p>
            <label>Password :</label>
            <input
              className={styles.input}
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              ref = {refs.password}
            />
          </p><br />
          <p className={styles.textError}>{errors.password}</p>
        </div>
        <div className={styles.divInput}>
          <p>
            <label>confirmPassword :</label>
            <input
              className={styles.input}
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              ref = {refs.confirmPassword}
            />
          </p><br />
          <p className={styles.textError}>{errors.confirmPassword}</p>
        </div>
        <div className={styles.divInput}>
          <label>Age:</label>
          <input
            className={styles.input}
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            ref = {refs.age}
          />
          <p className={styles.textError}>{errors.age}</p>
        </div>
        <div className={styles.divInput}>
          <label>Agree:</label>
          <input
            className={styles.input}
            type="checkbox"
            name="terms"
            value={form.terms}
            onChange={handleChange}
            ref = {refs.terms}
          />
          <p className={styles.textError}>{errors.terms}</p>
        </div>
        <div>
          <button type='submit'>Subscribe</button>
        </div>
      </form>
    </>
  )
}