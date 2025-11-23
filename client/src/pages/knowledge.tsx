import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Upload, Search, Download, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Document } from "@shared/schema";

export default function Knowledge() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [askAIDialogOpen, setAskAIDialogOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");

  const { data: documents, isLoading } = useQuery<Document[]>({
    queryKey: ["/api/documents", categoryFilter, searchQuery],
  });

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      await apiRequest("POST", "/api/documents/upload", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });
      setUploadDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const askAIMutation = useMutation({
    mutationFn: async (question: string) => {
      const response = await apiRequest("POST", "/api/documents/ask-ai", {
        question,
      });
      return response;
    },
    onSuccess: (data: any) => {
      setAiAnswer(data.answer);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    uploadMutation.mutate(formData);
  };

  const handleAskAI = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setAiAnswer("");
    askAIMutation.mutate(aiQuestion);
  };

  const filteredDocuments = documents?.filter((doc) => {
    const matchesSearch =
      !searchQuery ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || doc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Knowledge Hub</h1>
          <p className="text-muted-foreground">
            Access company policies, training materials, and operational
            documentation
          </p>
        </div>
        <div className="flex gap-3">
          <Dialog open={askAIDialogOpen} onOpenChange={setAskAIDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" data-testid="button-ask-ai">
                <MessageSquare className="h-4 w-4 mr-2" />
                Ask AI
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ask the AI Assistant</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAskAI} className="space-y-4">
                <div>
                  <Textarea
                    placeholder="Ask a question about company knowledge..."
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    className="min-h-24"
                    data-testid="textarea-ai-question"
                  />
                </div>
                {aiAnswer && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Answer</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm whitespace-pre-wrap" data-testid="text-ai-answer">
                        {aiAnswer}
                      </p>
                    </CardContent>
                  </Card>
                )}
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={askAIMutation.isPending || !aiQuestion.trim()}
                    data-testid="button-submit-ai-question"
                  >
                    {askAIMutation.isPending ? "Thinking..." : "Ask"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-upload-document">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    name="title"
                    placeholder="Document title"
                    required
                    data-testid="input-document-title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Description
                  </label>
                  <Textarea
                    name="description"
                    placeholder="Brief description"
                    data-testid="textarea-document-description"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Category
                  </label>
                  <Select name="category" required>
                    <SelectTrigger data-testid="select-document-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="policy">Policy</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="operational">Operational</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">File</label>
                  <Input
                    type="file"
                    name="file"
                    required
                    data-testid="input-document-file"
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={uploadMutation.isPending}
                    data-testid="button-submit-upload"
                  >
                    {uploadMutation.isPending ? "Uploading..." : "Upload"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search-documents"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48" data-testid="select-filter-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="policy">Policy</SelectItem>
                <SelectItem value="training">Training</SelectItem>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : filteredDocuments && filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="hover-elevate" data-testid={`document-card-${doc.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <Badge variant="secondary" className="text-xs">
                    {doc.category}
                  </Badge>
                </div>
                <CardTitle className="text-base line-clamp-2">
                  {doc.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {doc.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {doc.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{(doc.fileSize / 1024).toFixed(1)} KB</span>
                  <span>{new Date(doc.createdAt!).toLocaleDateString()}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3"
                  data-testid={`button-download-${doc.id}`}
                >
                  <Download className="h-3 w-3 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium mb-2">No documents found</p>
            <p className="text-muted-foreground mb-4">
              {searchQuery || categoryFilter !== "all"
                ? "Try adjusting your filters"
                : "Upload your first document to get started"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
