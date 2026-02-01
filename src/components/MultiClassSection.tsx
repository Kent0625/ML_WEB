import { useState } from 'react';
import { Card, cn } from './ui/Card';
import { calculateMacroF1, formatPercent } from '../utils/metrics';
import { LayoutGrid, Calculator } from 'lucide-react';

export default function MultiClassSection() {
  // 3x3 Matrix state. 
  // Row = Actual, Col = Predicted.
  // 0=Apple, 1=Orange, 2=Banana
  const [matrix, setMatrix] = useState<number[][]>([
    [30, 10, 0], // Apple
    [5, 40, 5],  // Orange
    [5, 5, 50]   // Banana
  ]);

  const updateMatrix = (r: number, c: number, val: string) => {
    const num = parseInt(val) || 0;
    const newMatrix = matrix.map((row, rIdx) => 
      row.map((cell, cIdx) => (rIdx === r && cIdx === c) ? num : cell)
    );
    setMatrix(newMatrix);
  };

  const { macroF1, classMetrics } = calculateMacroF1(matrix);
  const classes = ['Apple', 'Orange', 'Banana'];
  const colors = ['bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300', 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'];

  return (
    <section className="space-y-8 pt-12 border-t border-slate-200 dark:border-slate-800">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <span className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
            Slide 4-5
          </span>
          The Fruit Sorter: Multi-class Classification
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Configure the confusion matrix for the Fruit Sorting Robot. See how <strong>One-vs-Rest (OvR)</strong> logic breaks down performance per fruit type.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Matrix Editor */}
        <Card>
          <div className="flex items-center justify-between mb-6">
             <h3 className="font-semibold text-xl flex items-center gap-2">
               <LayoutGrid className="w-5 h-5 text-slate-500"/> Confusion Matrix
             </h3>
             <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Rows: Actual | Cols: Predicted</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-sm font-medium text-slate-400">Actual \ Pred</th>
                  {classes.map((c, i) => (
                    <th key={c} className={cn("p-2 text-sm font-bold", colors[i])}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {classes.map((rowLabel, rIdx) => (
                  <tr key={rowLabel}>
                    <th className={cn("p-2 text-sm font-bold text-left", colors[rIdx])}>{rowLabel}</th>
                    {matrix[rIdx].map((cell, cIdx) => (
                      <td key={`${rIdx}-${cIdx}`} className="p-1">
                        <input
                          type="number"
                          min="0"
                          value={cell}
                          onChange={(e) => updateMatrix(rIdx, cIdx, e.target.value)}
                          className={cn(
                            "w-full p-3 text-center rounded-lg border focus:ring-2 outline-none transition-all font-mono text-lg",
                            rIdx === cIdx 
                              ? "bg-emerald-50 border-emerald-200 text-emerald-700 focus:ring-emerald-500 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400" 
                              : "bg-slate-50 border-slate-200 text-slate-600 focus:ring-blue-500 dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-300"
                          )}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-sm text-slate-600 dark:text-slate-400">
            <p><strong>Tip:</strong> The diagonal (Green) represents correct predictions. Off-diagonal cells represent specific confusions (e.g., Row "Apple" / Col "Orange" = Apples misclassified as Oranges).</p>
          </div>
        </Card>

        {/* Calculation Breakdown */}
        <div className="space-y-6">
          <Card className="h-full">
            <h3 className="font-semibold text-xl mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-slate-500"/> Performance Breakdown
            </h3>

            <div className="space-y-6">
              {classMetrics.map((m, i) => (
                <div key={m.label} className="space-y-2">
                   <div className="flex justify-between items-center">
                     <span className={cn("px-2 py-0.5 rounded text-sm font-medium", colors[i])}>{m.label} Stats</span>
                     <span className="font-mono text-sm text-slate-400">F1: {formatPercent(m.f1)}</span>
                   </div>
                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-sm">
                      <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">
                        <div className="text-xs text-slate-400">Precision</div>
                        <div className="font-semibold">{formatPercent(m.precision)}</div>
                      </div>
                      <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">
                        <div className="text-xs text-slate-400">Recall</div>
                        <div className="font-semibold">{formatPercent(m.recall)}</div>
                      </div>
                      <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">
                        <div className="text-xs text-slate-400">Specificity</div>
                        <div className="font-semibold">{formatPercent(m.specificity)}</div>
                      </div>
                      <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded font-medium text-slate-900 dark:text-slate-100">
                        <div className="text-xs text-slate-500 dark:text-slate-400">Class F1</div>
                        <div>{formatPercent(m.f1)}</div>
                      </div>
                   </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold">Macro-Average F1</h4>
                  <p className="text-xs text-slate-500">Average of all class F1 scores</p>
                </div>
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  {formatPercent(macroF1)}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
