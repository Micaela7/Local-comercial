document.addEventListener("DOMContentLoaded", () => {
    const calcularBtn = document.getElementById("calcular");

    calcularBtn.addEventListener("click", () => {
        const precios = [253000, 158000, 150080, 142000, 145000, 122000, 110000, 185000];
        const cantidades = [
            parseInt(document.getElementById("cant1").value) || 0,
            parseInt(document.getElementById("cant2").value) || 0,
            parseInt(document.getElementById("cant3").value) || 0,
            parseInt(document.getElementById("cant4").value) || 0,
            parseInt(document.getElementById("cant5").value) || 0,
            parseInt(document.getElementById("cant6").value) || 0,
            parseInt(document.getElementById("cant7").value) || 0,
            parseInt(document.getElementById("cant8").value) || 0,            
        ];

        let totalSin = 0;
        for (let i = 0; i < precios.length; i++) {
            totalSin += precios[i] * cantidades[i];
        }

        const promo = document.getElementById("promoSelect").value;
        let descuento = 0;
        let mensaje = "";

        switch (promo) {
            case "mitad":
                const totalProductos = cantidades.reduce((a, b) => a + b, 0);
                if (totalProductos >= 2) {
                    const preciosSeleccionados = [];
                    for (let i = 0; i < cantidades.length; i++) {
                        for (let j = 0; j < cantidades[i]; j++) preciosSeleccionados.push(precios[i]);
                    }
                    preciosSeleccionados.sort((a, b) => a - b);
                    if (preciosSeleccionados.length >= 2) {
                        descuento = preciosSeleccionados[1] * 0.5;
                        mensaje = "¡Aplicaste el 50% en tu segundo producto!";
                    }
                } else {
                    mensaje = "Debés llevar al menos 2 productos para esta promoción.";
                }
                break;

            case "3x2":
                const totalItems = cantidades.reduce((a, b) => a + b, 0);
                if (totalItems >= 3) {
                    const preciosTotales = [];
                    for (let i = 0; i < precios.length; i++) {
                        for (let j = 0; j < cantidades[i]; j++) preciosTotales.push(precios[i]);
                    }
                    preciosTotales.sort((a, b) => a - b);
                    descuento = preciosTotales[0]; 
                    mensaje = "¡Promoción 3x2 aplicada! El producto más económico es gratis.";
                } else {
                    mensaje = "Debés llevar al menos 3 productos para esta promoción.";
                }
                break;

            case "30off":
                if (totalSin > 200000) {
                    descuento = totalSin * 0.3;
                    mensaje = "¡Obtuviste 30% de descuento por superar los $200.000!";
                } else {
                    mensaje = "Tu compra debe superar los $200.000 para aplicar el 30% de descuento.";
                }
                break;

            default:
                mensaje = "No se aplicó ninguna promoción.";
                break;
        }

        const totalCon = totalSin - descuento;

        document.getElementById("totalSin").textContent = `$${totalSin.toLocaleString("es-AR")}`;
        document.getElementById("desc").textContent = `-$${descuento.toLocaleString("es-AR")}`;
        document.getElementById("totalCon").textContent = `$${totalCon.toLocaleString("es-AR")}`;
        document.getElementById("mensajePromo").textContent = mensaje;
    });
});
