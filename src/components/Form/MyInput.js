export default function MyInput(props) {
    const { type, placeholder, valor, funcion, name } = props;
    return (
        <input className="myInput" name={name} type={type} placeholder={placeholder} value={valor} onChange={funcion} />
    )
}