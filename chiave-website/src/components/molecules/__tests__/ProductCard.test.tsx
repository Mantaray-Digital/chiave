import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProductCard } from "../ProductCard";

// Mock the SDK hooks
vi.mock("@mantaray-digital/store-sdk/react", () => ({
  useCart: () => ({ addItem: vi.fn() }),
  useStoreConfig: () => ({
    data: {
      settings: { currencySymbol: "$", currencyPosition: "before" },
    },
  }),
}));

// Mock the CartToast
vi.mock("@/components/atoms/CartToast", () => ({
  useCartToast: () => ({ showToast: vi.fn() }),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props;
    return <img {...rest} />;
  },
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const baseProduct = {
  _id: "prod-1",
  name: "Bronze Sculpture",
  description: "A beautiful bronze sculpture",
  basePrice: 250,
  images: ["/images/test.png"],
  hasVariants: false,
  createdAt: Date.now(),
};

describe("ProductCard", () => {
  it("renders product name", () => {
    render(<ProductCard product={baseProduct} />);
    expect(screen.getByText("Bronze Sculpture")).toBeInTheDocument();
  });

  it("renders product price", () => {
    render(<ProductCard product={baseProduct} />);
    expect(screen.getByText("$250.00")).toBeInTheDocument();
  });

  it("renders product description", () => {
    render(<ProductCard product={baseProduct} />);
    expect(
      screen.getByText("A beautiful bronze sculpture")
    ).toBeInTheDocument();
  });

  it("renders discount badge when compareAtPrice exists", () => {
    render(
      <ProductCard
        product={{ ...baseProduct, compareAtPrice: 400 }}
      />
    );
    expect(screen.getByText("Sale")).toBeInTheDocument();
    expect(screen.getByText("$400.00")).toBeInTheDocument();
  });

  it("renders sold out when stock is 0", () => {
    render(<ProductCard product={{ ...baseProduct, stock: 0 }} />);
    expect(screen.getAllByText("Sold Out").length).toBeGreaterThan(0);
  });

  it("renders View link to product page", () => {
    render(<ProductCard product={baseProduct} />);
    const viewLink = screen.getByRole("link", { name: /view/i });
    expect(viewLink).toHaveAttribute("href", "/shop/prod-1");
  });

  it("renders product image", () => {
    render(<ProductCard product={baseProduct} />);
    const img = screen.getByAltText("Bronze Sculpture");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/images/test.png");
  });
});
