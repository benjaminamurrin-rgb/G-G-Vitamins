import { Threads } from "@/components/ui/threads";

const ThreadsDemo = () => {
  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-neutral-900 p-4">
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          height: "600px",
          position: "relative",
          overflow: "hidden",
          borderRadius: "8px",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3), 0 8px 10px -6px rgba(0,0,0,0.2)",
        }}
      >
        <Threads
          className="h-full w-full"
          amplitude={0.7}
          distance={0.05}
          enableMouseInteraction={true}
          color={[1.0, 1.0, 1.0]}
        />
      </div>
    </div>
  );
};

export { ThreadsDemo };
