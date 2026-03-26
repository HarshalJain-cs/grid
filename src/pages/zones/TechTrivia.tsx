import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VolunteerPanel from '@/components/shared/VolunteerPanel';
import { Zap, Target, Users, AlertTriangle } from 'lucide-react';

export default function TechTrivia() {
  return (
    <div className="pt-20 pb-12 px-4 md:px-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="font-mono text-[11px] text-ink-muted uppercase tracking-widest">Tech Trivia</p>
        <h1 className="font-display text-4xl md:text-5xl text-ink">Quick Fire</h1>
        <span className="inline-block font-mono text-[11px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full mt-3">LIVE BUZZER ROUND</span>
      </div>

      <Tabs defaultValue="rules">
        <TabsList className="bg-cream-alt border border-cream-border">
          <TabsTrigger value="rules" className="data-[state=active]:bg-leaf data-[state=active]:text-white font-mono text-xs">Participant Rules</TabsTrigger>
          <TabsTrigger value="volunteer" className="data-[state=active]:bg-leaf data-[state=active]:text-white font-mono text-xs">Volunteer Entry</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="mt-6 space-y-6">
          {/* How It Works */}
          <div className="border border-cream-border rounded-2xl p-6 bg-white">
            <h3 className="font-display text-xl text-ink mb-3">How It Works</h3>
            <p className="font-body text-sm text-ink-muted leading-relaxed">
              Questions will be displayed on screen one after the other. Teams must hit the buzzer if they know the answer. The team that buzzes first gets to answer — if correct, they score. If wrong, the next team that buzzed can try.
            </p>
          </div>

          {/* Rules */}
          <div className="space-y-3">
            <h3 className="font-display text-lg text-ink">Rules</h3>
            {[
              { icon: Target, text: 'Questions appear on screen one at a time' },
              { icon: Zap, text: 'Hit the buzzer when you know the answer — fastest team goes first' },
              { icon: Users, text: 'If answered correctly, your team gets the point' },
              { icon: AlertTriangle, text: 'If wrong, the next team that buzzed can answer' },
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-3 border border-cream-border rounded-xl bg-white">
                <div className="w-8 h-8 rounded-full bg-leaf-bg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <r.icon size={14} className="text-leaf" />
                </div>
                <p className="font-body text-sm text-ink-muted leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>

          {/* Scoring */}
          <div className="border border-cream-border rounded-xl overflow-hidden">
            <div className="bg-cream-alt px-4 py-2 font-mono text-[11px] text-ink-muted uppercase">Scoring</div>
            {[['Correct answer', '2 marks per question'], ['All 30 correct', '60 pts (max)'], ['Wrong answer', 'No penalty — next team gets a chance']].map(([l, p]) => (
              <div key={l} className="flex justify-between px-4 py-2.5 border-t border-cream-border">
                <span className="font-body text-sm text-ink">{l}</span>
                <span className="font-mono text-sm text-leaf font-bold">{p}</span>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-leaf-bg border border-leaf/20 rounded-xl p-5">
            <h3 className="font-display text-lg text-ink mb-3">Tips & Strategy</h3>
            <div className="space-y-2">
              {[
                'Stay alert — speed matters as much as knowledge',
                'Discuss with your teammate before buzzing if unsure',
                'Topics cover AI, tech companies, digital policy, EVs, semiconductors & more',
                'No penalty for wrong answers, so take calculated risks',
                'Listen carefully — some questions have tricky wording',
              ].map((tip, i) => (
                <p key={i} className="font-body text-sm text-ink-muted">
                  <span className="font-mono text-leaf mr-2">→</span>{tip}
                </p>
              ))}
            </div>
          </div>

          {/* Motivation */}
          <div className="text-center py-6">
            <p className="font-display text-2xl text-ink mb-2">Ready to buzz in?</p>
            <p className="font-body text-sm text-ink-muted">Think fast, answer smart. Every point counts toward your total score!</p>
          </div>
        </TabsContent>

        <TabsContent value="volunteer" className="mt-6">
          <VolunteerPanel zone="trivia" maxScore={60} judgingCriteria={[
            { label: 'Each correct answer', points: '2 marks' },
            { label: 'All 30 correct', points: '60 pts' },
          ]} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
