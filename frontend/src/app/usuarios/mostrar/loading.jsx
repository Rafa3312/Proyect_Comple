// Cargando.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Cargando() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
            </div>
            <h1 className="mt-3">Cargando...</h1>
        </div>
    );
}
