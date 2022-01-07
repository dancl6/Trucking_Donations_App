import { useForm } from "react-hook-form"

function Test_Form_Fill() {
    const preloadedValues = {
        state: "this is the new state",
        number: 12345
    }
    const { register, handleSubmit } = useForm({
        defaultValues: preloadedValues
    })

    const onSubmit = (data) => {
        alert(JSON.stringify(data))
    }

    return(
        <form onSubmit = {handleSubmit(onSubmit)}>
            <input
            ref={register}
            placeholder= "State"
            type = "state"
            {...register("state", {required: true})}
            name = "state"
            />
            <input
            ref = {register}
            placeholder = "Number"
            type = "number"
            {...register("number", {required: true})}
            name = "number"
            />
            <button>Submit</button>
        </form>
    )
}

export default Test_Form_Fill;