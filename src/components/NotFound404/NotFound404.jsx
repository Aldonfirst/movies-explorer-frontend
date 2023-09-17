import "./NotFound404.css";
import { Link, useNavigate } from "react-router-dom";

function NotFound404({ status = 404, message = "Страница не найдена" }) {
    const navigate = useNavigate();
    const goBack = () => {navigate(-1)};

    return (
        <section className="not-found">
            <div>
                <h2 className="not-found__title">{status}</h2>
                <h3 className="not-found__subtitle">{message}</h3>
            </div>
            <Link className="not-found__link" onClick={goBack}>Назад</Link>
        </section>
    );
}

export default NotFound404;
