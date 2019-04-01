let data = {
    nodos: [],
    arcos: []
}

function graficar() {
    graficarGrafos('grafica', 600, 600, data);
}

function limpiarGrafo() {
    d3.select('#grafica').selectAll("*").remove();
}

function vaciarData() {
    data = {
        nodos: [],
        arcos: []
    }
}

function limpiarCampos(formulario) {
    if (formulario == 1) {
        document.getElementById('id_nodo').value = '';
        document.getElementById('grupo_nodo').value = '';
        document.getElementById('titulo_nodo').value = '';
    } else {
        document.getElementById('source_arco').value = '';
        document.getElementById('target_arco').value = '';
        document.getElementById('value_arco').value = '';
    }
}

function anadirNodo(id, grupo, titulo = null) {
    for (let i = 0; i < data.nodos.length; i++) {
        const element = data.nodos[i];

        if (element.id === id) {
            alert('El nodo ya existe');
            return;
        }
    }
    data.nodos.push({ id: id, group: grupo, title: titulo });
    limpiarGrafo();
    graficar();
    limpiarCampos(1);
}

function anadirArco(source, target, value) {
    data.arcos.push({ source: source, target: target, value: value });
    limpiarGrafo();
    graficar();
    limpiarCampos(2);
}

function mostrarMatrizAdyascencia() {
    alert(toString(data));
}