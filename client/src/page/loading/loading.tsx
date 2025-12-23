export default function LoadingPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-linear-to-br from-background to-muted">
      <div className="mb-6 text-3xl font-bold tracking-tight">FromeUp</div>

      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-primary/30" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Preparing your workspace...
      </p>
    </div>
  );
}
