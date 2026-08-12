import BlockPalette from "../components/BlockPalette";
import NewsletterAlerts from "../components/NewsletterAlerts";
import NewsletterCanvas from "../components/NewsletterCanvas";
import NewsletterHeader from "../components/NewsletterHeader";
import NewsletterSubjectField from "../components/NewsletterSubjectField";
import SendNewsletterPanel from "../components/SendNewsletterPanel";
import SubscribersModal from "../components/SubscribersModal";
import useNewsletterBuilder from "../hooks/useNewsletterBuilder";

export default function NewsletterPage() {
  const newsletter = useNewsletterBuilder();

  return (
    <div className="max-w-7xl min-h-screen p-4 mx-auto md:py-8">
      <NewsletterHeader
        subscribersCount={newsletter.subscribers.length}
        onOpenSubscribers={() => newsletter.setShowSubscribers(true)}
      />

      <NewsletterAlerts
        sendSuccess={newsletter.sendSuccess}
        sendError={newsletter.sendError}
        subscriberError={newsletter.subscriberError}
      />

      <NewsletterSubjectField
        subject={newsletter.subject}
        onSubjectChange={newsletter.setSubject}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-2">
          <BlockPalette onAddBlock={newsletter.addBlock} />
        </div>

        <div className="lg:col-span-6">
          <NewsletterCanvas
            activeBlockId={newsletter.activeBlockId}
            blocks={newsletter.blocks}
            onDeleteBlock={newsletter.deleteBlock}
            onDragEnd={newsletter.handleDragEnd}
            onDragEnter={newsletter.handleDragEnter}
            onDragStart={newsletter.handleDragStart}
            onSelectBlock={newsletter.setActiveBlockId}
            onTogglePreview={() =>
              newsletter.setShowPreview((showPreview) => !showPreview)
            }
            onUpdateBlock={newsletter.updateBlock}
            showPreview={newsletter.showPreview}
            subject={newsletter.subject}
          />
        </div>

        <div className="lg:col-span-4">
          <SendNewsletterPanel
            activeSubscriberCount={newsletter.activeSubscriberCount}
            blocksCount={newsletter.blocks.length}
            loadingSubscribers={newsletter.loadingSubscribers}
            onSend={newsletter.handleSend}
            sending={newsletter.sending}
            subject={newsletter.subject}
          />
        </div>
      </div>

      {newsletter.showSubscribers && (
        <SubscribersModal
          addEmail={newsletter.addEmail}
          addError={newsletter.addError}
          addName={newsletter.addName}
          loadingSubscribers={newsletter.loadingSubscribers}
          onAddEmailChange={newsletter.setAddEmail}
          onAddNameChange={newsletter.setAddName}
          onAddSubscriber={newsletter.handleAddSubscriber}
          onClose={() => newsletter.setShowSubscribers(false)}
          onDeleteSubscriber={newsletter.deleteSubscriber}
          subscribers={newsletter.subscribers}
        />
      )}
    </div>
  );
}
