import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteProduct } from "@/pages/admin/products/services/adminProductService";

export function DeleteModal({ productId, onDeleted }) {
	const [open, setOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		try {
			setIsDeleting(true);
			await deleteProduct(productId);
			setOpen(false); // tutup dialog
			onDeleted?.(productId); // beritahu parent untuk update list
			toast.success("Product Deleted");
		} catch (error) {
			console.log(error);
			// tampilkan toast/error message di sini
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<AlertDialog
			open={open}
			onOpenChange={(next) => {
				if (!isDeleting) setOpen(next);
			}}
		>
			<AlertDialogTrigger
				render={
					<button className="text-gray-900 border border-gray-400 hover:bg-gray-900 hover:text-white transition duration-100 rounded-lg p-4">
						<FaTrashAlt />
					</button>
				}
			/>
			<AlertDialogContent size="sm">
				<AlertDialogHeader>
					<AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
						<Trash2Icon />
					</AlertDialogMedia>
					<AlertDialogTitle>Delete Product?</AlertDialogTitle>
					<AlertDialogDescription>
						This product will be permanently deleted and cannot be
						restored.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel variant="outline" disabled={isDeleting}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						variant="destructive"
						disabled={isDeleting}
						onClick={handleDelete}
					>
						{isDeleting ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
