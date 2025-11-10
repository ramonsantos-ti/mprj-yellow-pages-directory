import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const reviewSchema = z.object({
  rating: z.number().min(3, 'Mínimo 3 estrelas').max(5, 'Máximo 5 estrelas'),
  comment: z
    .string()
    .min(1, 'Comentário obrigatório')
    .max(500, 'Máximo 500 caracteres'),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  onSubmit: (data: ReviewFormData) => void;
  isSubmitting: boolean;
  disabled?: boolean;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  onSubmit,
  isSubmitting,
  disabled,
}) => {
  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      comment: '',
    },
  });

  const rating = form.watch('rating');
  const comment = form.watch('comment');

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Avaliar Perfil</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avaliação (mínimo 3 estrelas)</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => field.onChange(star)}
                        disabled={disabled || star < 3}
                        className={`transition-all ${
                          star < 3 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
                        }`}
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Comentário ({comment.length}/500 caracteres)
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Compartilhe sua experiência com este profissional..."
                    disabled={disabled}
                    rows={4}
                    maxLength={500}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={disabled || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
