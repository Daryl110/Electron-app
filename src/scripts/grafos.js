/**
 * Funcion para graficar grafos
 * @param {*} svgId: id del svg puesto en el DOM 
 * @param {*} anchoGrafica: tamaño horizontal del svg
 * @param {*} altoGrafica: tamaño vertical del svg
 * @param {*} datos: data a graficar tiene que estar de la forma 
 *      { 
 *          nodos:
 *              [
 *                  {
 *                      id: '',
 *                      group: numero,
 *                      ?title: ''
 *                  }
 *              ],
 *          arcos:
 *              [
 *                  {
 *                      source: idnodopadre,
 *                      target: idnodohijo,
 *                      value: varlorNumericoEnteroDelArco
 *                  }
 *              ]
 *      }
 * @param {*} funcionesNodo: funciones que se realizaran con la accion que requiera el usuario(Programador, cliente, etc..)
 *      de la forma 
 *      [
 *          {
 *              accion: 'tipo de accion',
 *              funcion: (nodo) => {
 *                  codigo de funcion
 *              }
 *          }
 *      ] 
 * @param {*} colorFondo: color del background para el svg
 */
function graficarGrafos(svgId, anchoGrafica, altoGrafica, datos, funcionesNodo = [], colorFondo = 'white') {

    /**
     * Seleccion y cambio del svg
     * 
     * svg: constante de sistema de vectores el cual contendra la grafica
     * Descripción codigo: este bloque de codigo esta diseñado para seleccionar el
     * svg del DOM y cambiar sus atributos segun preferencias del usuario(programador, cliente, etc...)
     */
    const svg = d3.select('#' + svgId);
    svg.attr('height', altoGrafica);
    svg.attr('width', anchoGrafica);
    svg.style('background-color', colorFondo);
    /**
     * Fin de seleccion y cambio del svg
     */

    /**
     * Atrapar datos
     * 
     * links: conexiones entre nodos (Arcos)
     * nodes: nodos individuales
     */
    const links = datos.arcos.map(d => Object.create(d));
    const nodes = datos.nodos.map(d => Object.create(d));
    /**
     * Fin de atrapar datos
     */

    /**
     * Creacion de la simulacion
     */
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(anchoGrafica / 2, altoGrafica / 2));
    /**
     * Fin de creacion de la simulacion
     */

    /**
     * Color: constante que permitira separar los grafos por grupos de colores
     */
    const color = () => {
        const scale = d3.scaleOrdinal(d3.schemeCategory10);
        return d => scale(d.group);
    }
    /**
     * Fin de color
     */

    /**
     * Creacion del drag(Animacion de arrastre interactivo con el mouse)
     */
    const drag = (simulation) => {

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }
    /**
     * Fin de el drag
     */

    /**
     * Creacion de arcos y grafos en el svg
     */
    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 5)
        .attr("fill", color(nodes))
        .call(drag(simulation));
    /**
     * Fin de cracion de arcos y nodos
     */

    /**
     * Agragar funcionalidades a nodos y arcos
     */
    link.append("title")
        .text(d => {
            return 'Value: '+d.value;
        });

    node.append("title")
        .text(d => {
            if (d.title) {
                return d.title;
            }
            return d.id;
        });
    
    funcionesNodo.forEach(funcion => {
        node.on(funcion.accion, funcion.funcion);
    });
    /**
     * Fin de agragacion de funcionalidades a nodos
     */

    /**
     * vinculacion nodos y arcos
     */
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    });
    /**
     * Fin de vinculacion de nodos y arcos
     */
}
/**
 * Codigo basado en: https://observablehq.com/@d3/force-directed-graph
   Realizado por: Mike Bostock
   Fecha Publicacion: 15/11/2017
 * Codigo basado en: http://palamago.github.io/intro-js-d3/bloque-II/circulos.html
   Realizado por: Pablo H. Paladino - @palamago 
 */
