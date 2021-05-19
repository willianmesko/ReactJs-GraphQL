import { Product } from "../interfaces/Product.interface";

export default function extractSearchFieldOptions(data: any) {
    const optionsList: string[] = [];
   
    data.map((item: Product[]) =>
      Object.keys(item).filter(option =>
        option !== 'id' &&
        option !== 'imageUrl' &&
        option !== '__typename' &&
        !optionsList.includes(option)
          ? optionsList.push(option)
          : '',
      ),
    );

    return optionsList;
}