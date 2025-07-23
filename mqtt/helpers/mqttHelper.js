function hayCambioDeDia(mensajeActual, mensajeAnterior) {
    if (!mensajeActual || !mensajeAnterior) return false;

    const fechaAnterior = new Date(mensajeAnterior.Time);
    const fechaActual = new Date(mensajeActual.Time);

    return (
        fechaAnterior.getFullYear() !== fechaActual.getFullYear() ||
        fechaAnterior.getMonth() !== fechaActual.getMonth() ||
        fechaAnterior.getDate() !== fechaActual.getDate()
    );
}

module.exports = { hayCambioDeDia};