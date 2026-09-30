import React from 'react';
import { LegalLayout } from '../components/LegalLayout';
import { LEGAL } from '../lib/legal';

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Política de Privacidade" updatedAt={LEGAL.privacyUpdatedAt}>
      <p>
        A {LEGAL.brand}, conduzida pelo {LEGAL.owner}, respeita a privacidade de seus usuários e está comprometida com a
        proteção dos dados pessoais tratados por meio de nosso site, páginas, formulários, serviços e integrações.
      </p>
      <p>
        Esta Política de Privacidade explica quais informações podemos coletar, como elas podem ser utilizadas,
        armazenadas e compartilhadas, bem como os direitos dos usuários em relação aos seus dados.
      </p>

      <h2>1. Informações que podemos coletar</h2>
      <p>Dependendo da forma como o usuário interage com nossos serviços, podemos coletar informações como:</p>
      <ul>
        <li>nome;</li>
        <li>endereço de e-mail;</li>
        <li>número de telefone;</li>
        <li>informações fornecidas voluntariamente em formulários ou no momento da compra;</li>
        <li>endereço IP;</li>
        <li>dados relacionados ao dispositivo e ao navegador;</li>
        <li>páginas acessadas e interações realizadas no site;</li>
        <li>parâmetros de campanha e origem de acesso (como UTMs);</li>
        <li>cookies e identificadores utilizados para análise, mensuração e publicidade.</li>
      </ul>
      <p>
        Quando o usuário conecta ou autoriza funcionalidades relacionadas às plataformas da Meta, também podemos receber
        informações disponibilizadas pela Meta de acordo com as permissões concedidas pelo próprio usuário. Essas
        informações podem incluir identificadores de usuário, conta, Página, conta comercial, conta de anúncios ou outros
        ativos e informações necessárias para oferecer a funcionalidade autorizada.
      </p>
      <p>Somente acessamos informações permitidas pelo usuário e disponibilizadas pela plataforma utilizada.</p>

      <h2>2. Como utilizamos as informações</h2>
      <p>As informações coletadas podem ser utilizadas para:</p>
      <ul>
        <li>fornecer nossos serviços e funcionalidades;</li>
        <li>responder solicitações e contatos;</li>
        <li>processar inscrições, compras ou cadastros;</li>
        <li>enviar avisos, acessos e conteúdos relacionados à {LEGAL.brand}, inclusive pelo grupo oficial no WhatsApp;</li>
        <li>analisar o desempenho de nossas páginas e campanhas;</li>
        <li>mensurar anúncios e conversões;</li>
        <li>melhorar a experiência do usuário;</li>
        <li>integrar nossos serviços com plataformas de terceiros;</li>
        <li>prevenir fraudes, abuso ou uso indevido;</li>
        <li>cumprir obrigações legais ou regulatórias.</li>
      </ul>
      <p>
        Não utilizamos dados obtidos através das plataformas da Meta para finalidades incompatíveis com as permissões
        concedidas pelo usuário.
      </p>

      <h2>3. Integrações com a Meta</h2>
      <p>
        Podemos utilizar ferramentas, APIs e tecnologias disponibilizadas pela Meta Platforms, Inc., incluindo o Pixel da
        Meta e a API de Conversões, recursos relacionados ao Facebook, Instagram e serviços de publicidade.
      </p>
      <p>
        Por meio dessas ferramentas, eventos de navegação e interação (por exemplo, visualização de página e clique para
        iniciar a compra) podem ser enviados à Meta, junto com identificadores como endereço IP, dados do navegador e
        cookies, para mensurar resultados e otimizar anúncios.
      </p>
      <p>
        Quando uma integração com a Meta é utilizada, o acesso às informações ocorre somente após a autorização
        correspondente e de acordo com as permissões disponibilizadas pela plataforma. Os dados provenientes dessas
        integrações são utilizados exclusivamente para possibilitar funcionalidades solicitadas ou autorizadas pelo
        usuário, incluindo gerenciamento, análise, mensuração ou operação de atividades relacionadas às plataformas da
        Meta.
      </p>

      <h2>4. Compartilhamento de informações</h2>
      <p>Podemos compartilhar informações estritamente quando necessário com fornecedores responsáveis por serviços como:</p>
      <ul>
        <li>hospedagem e infraestrutura;</li>
        <li>processamento de pagamentos (a compra do ingresso é realizada na plataforma Hotmart);</li>
        <li>envio de e-mails e comunicações;</li>
        <li>ferramentas de análise;</li>
        <li>plataformas de publicidade;</li>
        <li>automações e integrações tecnológicas.</li>
      </ul>
      <p>Esses prestadores recebem apenas as informações necessárias para executar suas respectivas funções.</p>
      <p>
        Também poderemos compartilhar informações quando isso for necessário para cumprir obrigação legal, determinação
        de autoridade competente ou proteger nossos direitos.
      </p>
      <p>
        <strong>Não comercializamos dados pessoais dos usuários.</strong>
      </p>

      <h2>5. Cookies e tecnologias de rastreamento</h2>
      <p>
        Nosso site pode utilizar cookies, pixels, tags e tecnologias semelhantes para funcionamento do site, análise de
        tráfego, mensuração de resultados e publicidade. Podemos utilizar ferramentas de terceiros, incluindo tecnologias
        fornecidas pela Meta e por outros serviços de análise e publicidade.
      </p>
      <p>O usuário pode controlar determinados cookies através das configurações de seu navegador.</p>

      <h2>6. Armazenamento e segurança</h2>
      <p>
        Adotamos medidas técnicas e administrativas razoáveis para proteger as informações contra acesso não autorizado,
        perda, alteração, divulgação ou uso indevido.
      </p>
      <p>
        Os dados são mantidos somente pelo período necessário para cumprir as finalidades descritas nesta política,
        atender obrigações legais ou exercer direitos.
      </p>

      <h2>7. Direitos do usuário</h2>
      <p>
        Nos termos da legislação aplicável, incluindo a Lei Geral de Proteção de Dados Pessoais — LGPD (Lei nº
        13.709/2018), o usuário poderá solicitar, quando aplicável:
      </p>
      <ul>
        <li>confirmação da existência de tratamento;</li>
        <li>acesso aos seus dados;</li>
        <li>correção de informações;</li>
        <li>exclusão de dados;</li>
        <li>informações sobre compartilhamento;</li>
        <li>revogação de consentimento.</li>
      </ul>

      <h2>8. Exclusão de dados</h2>
      <p>O usuário poderá solicitar a exclusão das informações associadas à utilização de nossos serviços.</p>
      <p>
        Para facilitar esse processo, disponibilizamos instruções específicas em:{' '}
        <a href={LEGAL.deletionUrl}>{LEGAL.deletionUrl}</a>
      </p>
      <p>
        Solicitações também poderão ser realizadas através do e-mail: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
      </p>

      <h2>9. Serviços de terceiros</h2>
      <p>
        Nosso site e nossos serviços podem conter integrações ou links para plataformas externas (como Hotmart, WhatsApp
        e Meta). Cada serviço de terceiros possui suas próprias práticas e políticas de privacidade, pelas quais não
        somos responsáveis.
      </p>

      <h2>10. Alterações nesta política</h2>
      <p>
        Esta Política de Privacidade poderá ser atualizada periodicamente para refletir alterações em nossos serviços,
        tecnologias ou requisitos legais. A versão mais recente estará sempre disponível nesta página.
      </p>

      <h2>11. Contato</h2>
      <p>
        Em caso de dúvidas, solicitações relacionadas à privacidade ou pedidos relacionados aos seus dados pessoais,
        entre em contato conosco através de:
      </p>
      <ul>
        <li>
          E-mail: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
        </li>
        <li>
          Site: <a href={LEGAL.siteUrl}>{LEGAL.siteUrl}</a>
        </li>
      </ul>
    </LegalLayout>
  );
}
