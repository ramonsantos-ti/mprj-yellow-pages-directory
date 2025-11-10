import React, { useState } from 'react';
import { Star, Check, X, Edit2, Eye } from 'lucide-react';
import { useAdminReviews } from '@/hooks/useAdminReviews';
import { useAuditLog } from '@/hooks/useAuditLog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ProfileReview } from '@/types';
import { format } from 'date-fns';

export const ReviewsTab: React.FC = () => {
  const { reviews, isLoading, approveReview, rejectReview, editReview } = useAdminReviews();
  const { addAuditLog } = useAuditLog();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingReview, setEditingReview] = useState<ProfileReview | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');
  const [rejectingReview, setRejectingReview] = useState<ProfileReview | null>(null);
  const [viewingReview, setViewingReview] = useState<ProfileReview | null>(null);

  const filteredReviews = reviews.filter((review) => {
    if (statusFilter === 'all') return true;
    return review.status === statusFilter;
  });

  const handleApprove = (review: ProfileReview) => {
    approveReview(review.id);
    addAuditLog(
      'APPROVE_REVIEW',
      'Admin',
      `Avaliação aprovada: ${review.profile?.name} por ${review.reviewer?.name}`,
      'Review',
      review.id
    );
  };

  const handleReject = (review: ProfileReview) => {
    rejectReview({ reviewId: review.id });
    setRejectingReview(null);
    addAuditLog(
      'REJECT_REVIEW',
      'Admin',
      `Avaliação rejeitada: ${review.profile?.name} por ${review.reviewer?.name}`,
      'Review',
      review.id
    );
  };

  const handleEdit = (review: ProfileReview) => {
    setEditingReview(review);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  const handleSaveEdit = () => {
    if (!editingReview) return;
    editReview({
      reviewId: editingReview.id,
      rating: editRating,
      comment: editComment,
    });
    addAuditLog(
      'EDIT_REVIEW',
      'Admin',
      `Avaliação editada: ${editingReview.profile?.name} - Nova nota: ${editRating}`,
      'Review',
      editingReview.id,
      JSON.stringify({ rating: editingReview.rating, comment: editingReview.comment }),
      JSON.stringify({ rating: editRating, comment: editComment })
    );
    setEditingReview(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Aprovada</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejeitada</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Carregando avaliações...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Gerenciar Avaliações
          </CardTitle>
          <CardDescription>
            Analise, aprove, rejeite ou edite avaliações de perfis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label>Filtrar por status:</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="approved">Aprovadas</SelectItem>
                <SelectItem value="rejected">Rejeitadas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Avaliado</TableHead>
                  <TableHead>Avaliador</TableHead>
                  <TableHead>Nota</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      Nenhuma avaliação encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{review.profile?.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {review.profile?.matricula}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{review.reviewer?.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {review.reviewer?.matricula}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {review.reviewer?.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{renderStars(review.rating)}</TableCell>
                      <TableCell>{getStatusBadge(review.status)}</TableCell>
                      <TableCell>
                        {format(new Date(review.created_at), 'dd/MM/yyyy HH:mm')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setViewingReview(review)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {review.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-green-600 hover:text-green-700"
                                onClick={() => handleApprove(review)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => setRejectingReview(review)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(review)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={!!viewingReview} onOpenChange={() => setViewingReview(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes da Avaliação</DialogTitle>
          </DialogHeader>
          {viewingReview && (
            <div className="space-y-4">
              <div>
                <Label>Avaliado:</Label>
                <p className="font-medium">{viewingReview.profile?.name}</p>
              </div>
              <div>
                <Label>Avaliador:</Label>
                <p className="font-medium">{viewingReview.reviewer?.name}</p>
              </div>
              <div>
                <Label>Nota:</Label>
                {renderStars(viewingReview.rating)}
              </div>
              <div>
                <Label>Comentário:</Label>
                <p className="text-sm">{viewingReview.comment}</p>
              </div>
              <div>
                <Label>Status:</Label>
                {getStatusBadge(viewingReview.status)}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingReview} onOpenChange={() => setEditingReview(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Avaliação</DialogTitle>
            <DialogDescription>
              Altere a nota ou comentário. A avaliação será automaticamente aprovada.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nota:</Label>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setEditRating(star)}
                    disabled={star < 3}
                    className={`transition-all ${
                      star < 3 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
                    }`}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= editRating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Comentário:</Label>
              <Textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                rows={4}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {editComment.length}/500 caracteres
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingReview(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>Salvar e Aprovar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Confirmation */}
      <AlertDialog open={!!rejectingReview} onOpenChange={() => setRejectingReview(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Rejeição</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja rejeitar esta avaliação? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => rejectingReview && handleReject(rejectingReview)}
              className="bg-red-600 hover:bg-red-700"
            >
              Rejeitar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
