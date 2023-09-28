import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
interface IProducts {
  eventKey: string;
  data: string;
}

const AccordianItem = ({ eventKey, data }: IProducts) => {
  return (
    <Accordion.Item eventKey={`${eventKey}`}>
      <Accordion.Header>Product #{eventKey}</Accordion.Header>
      <Accordion.Body>Details of Product #{data}</Accordion.Body>
    </Accordion.Item>
  );
};

export default function Products() {
  const [productData, setProductData] = useState<string[]>([]);
  const [loadDataLimit, setLoadDataLimit] = useState<number>(100);
  useEffect(() => {
    setProductData(Array.from({ length: 100000 }, (_, i) => Number(i + Math.random()).toFixed(3)));
  }, []);

  return (
    <div
      className="overflow-auto h-100 scrollbar"
      onScroll={(e) => {
        const target = e.target as HTMLElement;
        if (target.scrollTop + target.offsetHeight >= target.scrollHeight) {
          setLoadDataLimit((prev) => prev + 100);
        }
      }}
    >
      <Accordion className="product-list" defaultActiveKey="0">
        {productData.slice(0, loadDataLimit).map((it, i) => (
          <AccordianItem key={`item${i}`} eventKey={`${i}`} data={it} />
        ))}
      </Accordion>
    </div>
  );
}
