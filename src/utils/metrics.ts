export const calculateBinaryMetrics = (tp: number, tn: number, fp: number, fn: number) => {
  const total = tp + tn + fp + fn;
  const actualPositives = tp + fn;
  const actualNegatives = tn + fp;
  const predictedPositives = tp + fp;

  // Sensitivity / Recall / TPR
  const recall = actualPositives === 0 ? 0 : tp / actualPositives;

  // Specificity / TNR
  const specificity = actualNegatives === 0 ? 0 : tn / actualNegatives;

  // Precision / PPV
  const precision = predictedPositives === 0 ? 0 : tp / predictedPositives;

  // F1 Score
  const f1 = (precision + recall) === 0 ? 0 : 2 * ((precision * recall) / (precision + recall));

  return {
    recall,
    specificity,
    precision,
    f1,
    total,
    actualPositives,
    actualNegatives
  };
};

export const formatPercent = (val: number) => {
  return new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 1 }).format(val);
};

export const calculateMacroF1 = (matrix: number[][]) => {
  // Matrix is 3x3: rows=actual, cols=predicted
  let totalF1 = 0;
  const classes = matrix.length;
  const totalSamples = matrix.flat().reduce((a, b) => a + b, 0);
  
  const classMetrics = matrix.map((_, i) => {
    const tp = matrix[i][i];
    const fp = matrix.reduce((acc, row, rIdx) => rIdx === i ? acc : acc + row[i], 0); // Sum of column i excluding diagonal
    const fn = matrix[i].reduce((acc, val, cIdx) => cIdx === i ? acc : acc + val, 0); // Sum of row i excluding diagonal
    const tn = totalSamples - tp - fp - fn;
    
    const precision = (tp + fp) === 0 ? 0 : tp / (tp + fp);
    const recall = (tp + fn) === 0 ? 0 : tp / (tp + fn);
    const specificity = (tn + fp) === 0 ? 0 : tn / (tn + fp);
    const f1 = (precision + recall) === 0 ? 0 : 2 * ((precision * recall) / (precision + recall));
    
    totalF1 += f1;
    
    return { precision, recall, specificity, f1, label: ['Apple', 'Orange', 'Banana'][i] };
  });

  return {
    macroF1: totalF1 / classes,
    classMetrics
  };
};
