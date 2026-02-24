"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewsSchema, reviewsTypeSchema } from "@/lib/schema/reviewsSchema";
import { 
  getProductReviews, 
  createReview, 
  updateReview, 
  deleteReview 
} from "@/actions/reviews.action";
import { ProductReviewsProps, ReviewsI } from "@/interfaces/reviews";
import { Star, MessageSquare, Edit2, Trash2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

export default function ProductReviews({ productId, currentUserId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<ReviewsI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm({
    mode: "all",
    resolver: zodResolver(reviewsSchema),
    defaultValues: {
      review: "",
      rating: 0,
    },
  });

  const editForm = useForm({
    mode: "all",
    resolver: zodResolver(reviewsSchema),
    defaultValues: {
      review: "",
      rating: 0,
    },
  });


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getProductReviews(productId);
        setReviews(data?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);


  async function handleAddReview(values: reviewsTypeSchema) {
    try {
      const response = await createReview(productId, values);

      if (response?.errors?.msg) {
        toast.error(response.errors.msg, {
          position: "top-center",
        });
        return;
      }
      
      const updatedReviews = await getProductReviews(productId);
      setReviews(updatedReviews?.data || []);
      form.reset();
      toast.success("Review added successfully!", {
        position: "top-center",
      });
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  }


  async function handleUpdateReview(values: reviewsTypeSchema) {
    if (!editingReviewId) return;

    try {
      const response = await updateReview(editingReviewId, values);
      if (response?.data) {
        setReviews(reviews.map(r => r._id === editingReviewId ? response.data : r));
        setEditingReviewId(null);
        editForm.reset();
        toast.success("Review updated successfully!", {
          position: "top-center",
        });
      } else {
        toast.error(response?.message || "Failed to update review", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  }


  async function handleDeleteReview(reviewId: string) {
    try {
      const response = await deleteReview(reviewId);
      if (response) {
        setReviews(reviews.filter(r => r._id !== reviewId));
        toast.success("Review deleted successfully!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete review", {
        position: "top-center",
      });
    }
  }


  function startEditing(review: ReviewsI) {
    setEditingReviewId(review?._id);
    editForm.setValue("review", review?.review || "");
    editForm.setValue("rating", review?.rating || 0);
  }


  function cancelEditing() {
    setEditingReviewId(null);
    editForm.reset();
  }


  function StarRating({ rating, onRatingChange, hoveredRating, onHoverChange }: { 
    rating: number; 
    onRatingChange: (rating: number) => void;
    hoveredRating: number;
    onHoverChange: (rating: number) => void;}) {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => onHoverChange(star)}
            onMouseLeave={() => onHoverChange(0)}
            className="cursor-pointer transition-transform hover:scale-110"
          >
            <Star
              className={`size-8 transition-colors ${
                star <= (hoveredRating || rating)
                  ? "text-[#C89B14] dark:text-[#F0C75E] fill-[#C89B14] dark:fill-[#F0C75E]"
                  : "text-muted fill-muted"
              }`}
            />
          </button>
        ))}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <div className="inline-block w-12 h-12 border-4 border-[#0D9D9A]/20 dark:border-[#5FD0CD]/20 border-t-[#0D9D9A] dark:border-t-[#5FD0CD] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-linear-to-br from-[#0D9D9A]/20 to-[#C89B14]/20 dark:from-[#5FD0CD]/20 dark:to-[#F0C75E]/20 rounded-xl flex items-center justify-center">
          <MessageSquare className="size-6 text-[#0D9D9A] dark:text-[#5FD0CD]" />
        </div>
        <div>
          <h2 className="text-3xl font-black">Customer Reviews</h2>
          <p className="text-sm text-muted-foreground">
            {reviews?.length || 0} {reviews?.length === 1 ? "review" : "reviews"}
          </p>
        </div>
      </div>

      <Separator />
      {currentUserId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 border-2">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>
            <form onSubmit={form.handleSubmit(handleAddReview)} className="space-y-5">
              <Controller
                name="rating"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-semibold mb-2">
                      Your Rating *
                    </FieldLabel>
                    <StarRating
                      rating={field.value}
                      onRatingChange={field.onChange}
                      hoveredRating={hoveredRating}
                      onHoverChange={setHoveredRating}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="review"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-sm font-semibold">
                      Your Review *
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id={field.name}
                      placeholder="Share your experience with this product..."
                      className="min-h-32 resize-none"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                className="cursor-pointer w-full h-12 bg-[#0D9D9A] hover:bg-[#087370] dark:bg-[#5FD0CD] dark:hover:bg-[#3BB9B6] font-bold"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="size-4 mr-2" />
                    Submit Review
                  </>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      )}

      <div className="space-y-6">
        <AnimatePresence>
          {reviews?.map((review, index) => {
            const isOwner = currentUserId === review?.user?._id;
            const isEditing = editingReviewId === review?._id;

            return (
              <motion.div
                key={review?._id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-6 border-2 hover:border-[#0D9D9A]/30 dark:hover:border-[#5FD0CD]/30 transition-all">
                  {isEditing ? (
                    <form onSubmit={editForm.handleSubmit(handleUpdateReview)} className="space-y-5">
                      <Controller
                        name="rating"
                        control={editForm.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text-sm font-semibold mb-2">
                              Your Rating *
                            </FieldLabel>
                            <StarRating
                              rating={field.value}
                              onRatingChange={field.onChange}
                              hoveredRating={hoveredRating}
                              onHoverChange={setHoveredRating}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        name="review"
                        control={editForm.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name} className="text-sm font-semibold">
                              Your Review *
                            </FieldLabel>
                            <Textarea
                              {...field}
                              id={field.name}
                              className="min-h-32 resize-none"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          className="cursor-pointer flex-1 bg-[#0D9D9A] hover:bg-[#087370] dark:bg-[#5FD0CD] dark:hover:bg-[#3BB9B6]"
                          disabled={editForm.formState.isSubmitting}
                        >
                          {editForm.formState.isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={cancelEditing}
                          className="cursor-pointer flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-linear-to-br from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] rounded-full flex items-center justify-center text-white font-bold">
                            {review?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <p className="font-bold">{review?.user?.name || "Anonymous"}</p>
                            <p className="text-xs text-muted-foreground">
                              {review?.createdAt ? format(new Date(review.createdAt), "PPP") : "Unknown date"}
                            </p>
                          </div>
                        </div>

                        {isOwner && (
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => startEditing(review)}
                              className="cursor-pointer hover:bg-[#0D9D9A]/10 dark:hover:bg-[#5FD0CD]/10"
                            >
                              <Edit2 className="size-4 text-[#0D9D9A] dark:text-[#5FD0CD]" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteReview(review?._id || "")}
                              className="cursor-pointer hover:bg-destructive/10"
                            >
                              <Trash2 className="size-4 text-destructive" />
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`size-4 ${
                              star <= (review?.rating || 0)
                                ? "text-[#C89B14] dark:text-[#F0C75E] fill-[#C89B14] dark:fill-[#F0C75E]"
                                : "text-muted fill-muted"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{review?.review || ""}</p>
                    </>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {(!reviews || reviews?.length === 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <MessageSquare className="size-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No reviews yet</h3>
            <p className="text-muted-foreground">
              Be the first to share your experience with this product
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}