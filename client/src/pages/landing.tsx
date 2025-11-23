import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Users, BarChart3, Brain } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-primary flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold">Employee Portal</h1>
          </div>
          <Button asChild data-testid="button-login">
            <a href="/api/login">Log In</a>
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Welcome to the Employee Portal
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your central hub for company knowledge, task management, and
            AI-powered insights. Streamline your workflow with integrated
            document management and intelligent automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6">
            <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Knowledge Hub</h3>
            <p className="text-sm text-muted-foreground">
              Access company policies, training materials, and operational
              documentation in one centralized location.
            </p>
          </Card>

          <Card className="p-6">
            <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Task Management</h3>
            <p className="text-sm text-muted-foreground">
              Track action items, deadlines, and deliverables with automated
              reminders and progress monitoring.
            </p>
          </Card>

          <Card className="p-6">
            <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Gain insights into team performance, task completion rates, and
              communication patterns.
            </p>
          </Card>

          <Card className="p-6">
            <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
            <p className="text-sm text-muted-foreground">
              Get instant answers from company knowledge, automated meeting
              summaries, and intelligent task extraction.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" asChild data-testid="button-get-started">
            <a href="/api/login">Get Started</a>
          </Button>
        </div>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 3PL Ontario. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
