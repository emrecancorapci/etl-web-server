const location = window.location.href;

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-primary">Welcome to Astro</h1>
      <p className="text-lg text-muted-foreground">
        Welcome to Astro, a modern frontend framework for building faster websites with less
        client-side JavaScript.
        {location}
      </p>
    </div>
  );
}
