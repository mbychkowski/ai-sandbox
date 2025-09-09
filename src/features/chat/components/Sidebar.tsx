'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="w-full">New Chat</Button>
        {/* Session history will go here */}
      </CardContent>
    </Card>
  );
}
