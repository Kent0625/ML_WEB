import { useState } from 'react';
import { Card, cn } from './ui/Card';
import { calculateBinaryMetrics, formatPercent } from '../utils/metrics';
import { AlertTriangle } from 'lucide-react';

export default function BinarySection() {
  // Initial state simulating a "balanced" but imperfect model
  const [tp, setTp] = useState(30);
  const [tn, setTn] = useState(40);
  const [fp, setFp] = useState(15);
  const [fn, setFn] = useState(15);

  const { recall, specificity, precision, f1 } = calculateBinaryMetrics(tp, tn, fp, fn);

  // Helper to render the visualization grid
  const renderGrid = () => {
    const dots = [];
    // We limit visual dots to 100 for performance/simplicity, scaling if needed
    // For this demo, inputs sum to 100 nicely.
    
    for (let i = 0; i < tp; i++) dots.push(<div key={`tp-${i}`} className="w-3 h-3 rounded-full bg-emerald-500" title="True Positive (Sick & Detected)" />);
    for (let i = 0; i < fn; i++) dots.push(<div key={`fn-${i}`} className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" title="False Negative (Sick & Missed!)" />);
    for (let i = 0; i < fp; i++) dots.push(<div key={`fp-${i}`} className="w-3 h-3 rounded-full bg-amber-400" title="False Positive (Healthy but Alarmed)" />);
    for (let i = 0; i < tn; i++) dots.push(<div key={`tn-${i}`} className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" title="True Negative (Healthy & Cleared)" />);

    return dots;
  };

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <span className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
            Slide 1-3
          </span>
          The AI Doctor: Binary Classification
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Tune the confusion matrix for a Cancer Screening AI. Your goal is to balance catching the disease (Recall) vs. scaring healthy patients (Specificity).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <Card className="space-y-6">
          <h3 className="font-semibold text-xl mb-4">Confusion Matrix Controls</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="tp-slider" className="text-sm font-medium text-emerald-600 dark:text-emerald-400">True Positives (Correctly Sick)</label>
                <span className="font-mono">{tp}</span>
              </div>
              <input 
                id="tp-slider"
                type="range" min="0" max="50" value={tp} 
                onChange={(e) => setTp(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="fn-slider" className="text-sm font-medium text-rose-600 dark:text-rose-400">False Negatives (Missed Sick)</label>
                <span className="font-mono">{fn}</span>
              </div>
              <input 
                id="fn-slider"
                type="range" min="0" max="50" value={fn} 
                onChange={(e) => setFn(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="fp-slider" className="text-sm font-medium text-amber-600 dark:text-amber-400">False Positives (False Alarm)</label>
                <span className="font-mono">{fp}</span>
              </div>
              <input 
                id="fp-slider"
                type="range" min="0" max="50" value={fp} 
                onChange={(e) => setFp(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="tn-slider" className="text-sm font-medium text-slate-500 dark:text-slate-400">True Negatives (Correctly Healthy)</label>
                <span className="font-mono">{tn}</span>
              </div>
              <input 
                id="tn-slider"
                type="range" min="0" max="50" value={tn} 
                onChange={(e) => setTn(Number(e.target.value))}
                className="w-full accent-slate-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="font-medium mb-2 text-sm text-slate-500">Patient Population Visualizer</h4>
            <div className="flex flex-wrap gap-1 p-2 bg-slate-50 dark:bg-slate-950/50 rounded-lg border border-slate-100 dark:border-slate-800 min-h-[160px] content-start">
              {renderGrid()}
            </div>
            <div className="flex gap-4 mt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"/> TP</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500"/> FN</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-400"/> FP</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300"/> TN</span>
            </div>
          </div>
        </Card>

        {/* Metrics Dashboard */}
        <div className="space-y-6">
          {/* Specificity Card */}
          <Card className={cn("transition-colors", specificity < 0.5 ? "border-amber-200 bg-amber-50 dark:bg-amber-900/10" : "")}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  Specificity (True Negative Rate)
                  {specificity < 0.5 && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Can we trust a negative result?</p>
              </div>
              <span className="text-3xl font-bold tabular-nums">{formatPercent(specificity)}</span>
            </div>
            <div className="text-sm space-y-2 mt-4">
              <div className="flex justify-between p-2 bg-white/50 dark:bg-black/20 rounded">
                <span>Formula</span>
                <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">TN / (TN + FP)</code>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                {specificity < 0.8 
                  ? "⚠️ Warning: Low specificity means many healthy people are being misdiagnosed (False Positives). This causes patient anxiety and wasted resources."
                  : "✅ Good: High specificity means the model rarely gives false alarms."}
              </p>
            </div>
          </Card>

          {/* F1 Score Card */}
          <Card className={cn("transition-colors", f1 < 0.5 ? "border-rose-200 bg-rose-50 dark:bg-rose-900/10" : "")}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  F1-Score
                  {f1 < 0.5 && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Harmonic mean of Precision & Recall</p>
              </div>
              <span className="text-3xl font-bold tabular-nums">{formatPercent(f1)}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
               <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                 <div className="text-xs text-slate-500 uppercase font-semibold">Recall</div>
                 <div className="text-xl font-bold text-slate-700 dark:text-slate-200">{formatPercent(recall)}</div>
               </div>
               <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                 <div className="text-xs text-slate-500 uppercase font-semibold">Precision</div>
                 <div className="text-xl font-bold text-slate-700 dark:text-slate-200">{formatPercent(precision)}</div>
               </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300">
              {Math.abs(precision - recall) > 0.4 
                ? "Notice the gap? F1-Score punishes the model because Precision and Recall are unbalanced. The Arithmetic Mean would be misleadingly high here."
                : "The F1-Score balances both metrics. It is critical for uneven class distributions."}
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
