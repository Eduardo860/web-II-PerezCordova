import MyFirstComponent from '../components/MyFirstComponent';
import Form from '../components/Form/Form';
import logo from '../logo.svg';
import '../App.css';
import ValidateToken from '../utils/ValidateToken';
export default function Home() {
    ValidateToken();
    return (
        <div>
            <h1>Home</h1>
            <MyFirstComponent/>
            <Form/>
        </div>
    )
}