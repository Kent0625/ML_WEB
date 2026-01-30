import BinarySection from './components/BinarySection';
import MultiClassSection from './components/MultiClassSection';
import { Card } from './components/ui/Card';
import { BookOpen, Activity } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
      
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Activity className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Metric Master <span className="text-slate-400 font-normal">| AI Performance Lab</span></h1>
          </div>
          <a 
            href="https://github.com/vercel-labs/agent-skills" 
            target="_blank" 
            rel="noreferrer"
            className="text-sm font-medium text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            About
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Intro Hero */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Stop Trusting <span className="text-blue-600 dark:text-blue-500">Accuracy</span>.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            In the real world, errors aren't created equal. A "False Alarm" is annoying, but a "Missed Diagnosis" can be fatal. 
            Explore how we measure what really matters.
          </p>
        </section>

        {/* Core Concept: Confusion Matrix Definition */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none p-8 sm:p-12">
           <div className="flex flex-col md:flex-row items-start gap-8">
             <div className="flex-1 space-y-4">
               <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                 <BookOpen className="w-5 h-5" />
                 <span>Core Concept</span>
               </div>
               <h2 className="text-2xl font-bold">The Confusion Matrix</h2>
               <p className="text-slate-300 leading-relaxed">
                 A tabular layout visualizing the performance of a supervised learning algorithm.
                 We do not evaluate a model by how many it got right in total, but by how it manages specific types of error.
               </p>
               <ul className="grid grid-cols-2 gap-4 mt-6 text-sm">
                 <li className="space-y-1">
                   <span className="font-bold text-emerald-400 block">TP (True Positive)</span>
                   <span className="text-slate-400">Correctly identified positive.</span>
                 </li>
                 <li className="space-y-1">
                   <span className="font-bold text-slate-400 block">TN (True Negative)</span>
                   <span className="text-slate-400">Correctly identified negative.</span>
                 </li>
                 <li className="space-y-1">
                   <span className="font-bold text-amber-400 block">FP (False Positive)</span>
                   <span className="text-slate-400">False Alarm (Type I Error).</span>
                 </li>
                 <li className="space-y-1">
                   <span className="font-bold text-rose-400 block">FN (False Negative)</span>
                   <span className="text-slate-400">Missed Detection (Type II Error).</span>
                 </li>
               </ul>
             </div>
             
             {/* Visual Matrix Graphic */}
             <div className="w-full md:w-auto flex-shrink-0 grid grid-cols-2 gap-2 font-mono text-center">
                <div className="col-span-2 text-xs text-slate-400 tracking-wider mb-1">PREDICTED CLASS</div>
                
                {/* Headers */}
                <div className="flex items-center justify-center -rotate-90 text-xs text-slate-400 tracking-wider absolute -left-6 top-1/2">ACTUAL</div>
                
                <div className="bg-emerald-500/20 border border-emerald-500/50 p-6 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-emerald-400">TP</div>
                  <div className="text-xs text-emerald-200/60">Hit</div>
                </div>
                <div className="bg-rose-500/20 border border-rose-500/50 p-6 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-rose-400">FN</div>
                  <div className="text-xs text-rose-200/60">Miss</div>
                </div>
                <div className="bg-amber-500/20 border border-amber-500/50 p-6 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-amber-400">FP</div>
                  <div className="text-xs text-amber-200/60">Alarm</div>
                </div>
                <div className="bg-slate-700/50 border border-slate-600 p-6 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-slate-300">TN</div>
                  <div className="text-xs text-slate-400">Clear</div>
                </div>
             </div>
           </div>
        </Card>

        <BinarySection />
        
        <MultiClassSection />

      </main>

      <footer className="py-12 text-center text-slate-500 text-sm">
        <p>© 2026 Metric Master. Educational interactive demo.</p>
      </footer>
    </div>
  );
}

export default App;