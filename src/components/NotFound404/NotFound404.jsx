import "./NotFound404.css";
import { Link, useNavigate } from "react-router-dom";

function NotFound404({ status = 404, message = "Страница не найдена" }) {
    const navigate = useNavigate();
    const goBack = () => {navigate(-1)};

    return (
        <main>
        <section className="not-found">
            <div>
                <h1 className="not-found__title">{status}</h1>
                <h2 className="not-found__subtitle">{message}</h2>
            </div>
            <Link className="page__hoverLink not-found__link" onClick={goBack}>Назад</Link>
        </section>
        </main>
    );
}

export default NotFound404;
