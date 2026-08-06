import { Minus, Plus, Trash2, X, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart";

const WHATSAPP_NUMBER = "+212698043729";

function formatOrderMessage(items: ReturnType<typeof useCart>["items"], total: number) {
  const lines = items.map(
    (i) => `• ${i.name} (${i.sizeLabel}) x${i.quantity} — ${i.price * i.quantity} DH`
  );
  return (
    `Bonjour Napolitano Berkane,\n\n` +
    `Je souhaite commander :\n${lines.join("\n")}\n\n` +
    `Total : ${total.toFixed(2)} DH\n\n` +
    `Merci !`
  );
}

export function BasketDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, total, count, updateQuantity, removeItem } = useCart();

  const handleOrder = () => {
    const message = encodeURIComponent(formatOrderMessage(items, total));
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "")}?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
        className={`fixed inset-y-0 right-0 z-[70] w-full max-w-md transform bg-background shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="font-display text-2xl tracking-wide">
              VOTRE PANIER <span className="text-primary">({count})</span>
            </h2>
            <button
              onClick={onClose}
              aria-label="Fermer le panier"
              className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-surface"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                <ShoppingBasketEmpty className="mb-4 h-16 w-16 opacity-30" />
                <p className="font-display text-xl">Votre panier est vide</p>
                <p className="mt-2 text-sm">Ajoutez des plats depuis le menu.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 rounded-2xl bg-surface p-3"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-16 w-16 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-display text-lg">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.sizeLabel}</p>
                      <p className="mt-1 font-display text-gold">{item.price} DH</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2 rounded-full border border-border bg-background px-2 py-1">
                        <button
                          aria-label="Diminuer"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="grid h-7 w-7 place-items-center rounded-full transition-colors hover:bg-surface"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-4 text-center font-display text-sm">{item.quantity}</span>
                        <button
                          aria-label="Augmenter"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="grid h-7 w-7 place-items-center rounded-full transition-colors hover:bg-surface"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        aria-label="Supprimer"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-border px-6 py-5">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg text-muted-foreground">Total</span>
              <span className="font-display text-3xl text-gold">{total.toFixed(2)} DH</span>
            </div>
            <button
              onClick={handleOrder}
              disabled={items.length === 0}
              className="btn-yellow mt-5 flex w-full items-center justify-center gap-2 rounded-full py-4 text-lg disabled:opacity-40"
            >
              <MessageCircle className="h-5 w-5" />
              COMMANDER PAR WHATSAPP
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ShoppingBasketEmpty({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m15 11-1.5-4.5h-3L9 11" />
      <path d="M3.8 7.5h16.4a1 1 0 0 1 1 1.2l-1.6 9a2 2 0 0 1-2 1.8H5.4a2 2 0 0 1-2-1.8l-1.6-9a1 1 0 0 1 1-1.2Z" />
      <path d="M12 16.5a3 3 0 0 1 0-6" />
    </svg>
  );
}
