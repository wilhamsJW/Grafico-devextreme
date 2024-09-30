import React from "react";
import Chart, {
  Legend,
  SeriesTemplate,
  Title,
  Subtitle,
  CommonSeriesSettings,
  Export,
  ValueAxis,
} from "devextreme-react/chart";
import { dataSource } from "./data.js";

// Função para customizar a série (barra) com base no valor do nameField (neste caso, o 'year')
const customizeSeries = (valueFromNameField) => {
  const colors = {
    100: "#1f77b4", // Azul
    200: "#ff7f0e", // Laranja
    300: "#2ca02c", // Verde
    400: "#d62728", // Vermelho
    800: "#9467bd", // Roxo
    600: "#ff3f7a", // Rosa
    1000: "#ff7f0e",
  };

  return {
    color: colors[valueFromNameField] || "yellow", // Define cor com base no valor ou usa preto como padrão
  };
};

function App() {
  return (
    <Chart
      dataSource={dataSource} // Definindo o data source
      resizeMode="auto" // Faz com que o gráfico se adapte ao tamanho da viewport
    >
      <CommonSeriesSettings
        argumentField="country" // Define o campo do eixo X (países)
        valueField="money" // Define o valor da série (dinheiro)
        type="bar" // Define o tipo de gráfico como barras
        barOverlapGroup="true" // Certifica que as séries não se sobreponham
        label={{
          visible: true, // Exibe o rótulo com o valor
          backgroundColor: "transparent", // Remove o fundo do rótulo
          font: {
            weight: 600,
            color: "#000",
          },
          format: {
            type: "currency", // Formato de moeda
            precision: 2, // Duas casas decimais
          },
          customizeText(e) {
            return `R$ ${e.valueText}`; // Personaliza o texto do rótulo para exibir "R$"
          },
        }}
      />
      <SeriesTemplate
        nameField="money" // Cria uma série separada para cada ano
        customizeSeries={customizeSeries} // Customiza a cor de cada série (barra)
      />
      <Title text="Money Production">
        <Subtitle text="(in thousands R$)" />
      </Title>
      <Legend verticalAlignment="bottom" horizontalAlignment="center" />
      <ValueAxis
        title="Amount (R$)"
        label={{
          customizeText: function (e) {
            return e.valueText + "k"; // Adiciona o sufixo 'k' para valores em milhar
          },
        }}
      />
      <Export enabled={true} />
    </Chart>
  );
}

export default App;
