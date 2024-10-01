import React from "react";
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Legend,
  ValueAxis,
  Title,
  Export,
  Tooltip,
  Label,
} from "devextreme-react/chart";
import service from "./data.js";

// Simulação de dados financeiros
const dataSource = service.getFinancialData();

// Função para formatar os valores em reais
function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

// Função para customizar o Tooltip
function customizeTooltip(arg) {
  return {
    text: `${arg.seriesName}: ${formatCurrency(arg.value)}`,
  };
}

function App() {
  return (
    <Chart id="chart" title="Estrutura Financeira" dataSource={dataSource}>
      <CommonSeriesSettings
        argumentField="state"
        type="stackedbar" // Define o gráfico como stacked bar
      />

      {/* Três séries com cores diferentes (gradiente azul) */}
      <Series
        valueField="young"
        name="Jovens (até 14 anos)"
        color="#003f5c" // Azul forte
      >
        <Label visible={true} customizeText={(e) => formatCurrency(e.value)} />
      </Series>
      <Series
        valueField="middle"
        name="Adultos (15-64 anos)"
        color="#2f4b7c" // Azul intermediário
      >
        <Label visible={true} customizeText={(e) => formatCurrency(e.value)} />
      </Series>
      <Series
        valueField="older"
        name="Idosos (65+ anos)"
        color="#665191" // Azul claro
      >
        <Label visible={true} customizeText={(e) => formatCurrency(e.value)} />
      </Series>

      <ValueAxis position="left"></ValueAxis>

      <Legend
        verticalAlignment="bottom"
        horizontalAlignment="center"
        itemTextPosition="top"
        visible={false}
      />
      <Export enabled={true} />
      <Tooltip
        enabled={true}
        location="edge"
        customizeTooltip={customizeTooltip}
      />
    </Chart>
  );
}

export default App;
//================= DADOS MOCKADOS ===================
const financialData = [
  {
    state: "Germany",
    young: 45000, // Jovens (até 14 anos)
    middle: 890000, // Adultos (15-64 anos)
    older: 320000, // Idosos (65+ anos)
  },
  {
    state: "Japan",
    young: 150000,
    middle: 700000,
    older: 500000,
  },
  {
    state: "Russia",
    young: 300000,
    middle: 1000000,
    older: 450000,
  },
  {
    state: "USA",
    young: 500000,
    middle: 1200000,
    older: 600000,
  },
];

export default {
  getFinancialData() {
    return financialData;
  },
};

