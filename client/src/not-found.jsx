import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-4xl font-bold">
            <AlertCircle className="h-8 w-8 text-destructive" />
            404
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold">Page Not Found</p>
          <p className="mt-2 text-muted-foreground">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link to="/dashboard">Go back home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
